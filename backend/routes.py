from flask import Blueprint, jsonify, request
from .models import Task, Admin
from . import db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy import asc, desc
import asyncio
from functools import wraps
from backend.app_logging import logger


main_bp = Blueprint('main', __name__)

def async_route(f):
    @wraps(f)
    def wrapped(*args, **kwargs):
        return asyncio.run(f(*args, **kwargs))
    return wrapped

@main_bp.route('/api/tasks', methods=['GET'])
@async_route
async def get_tasks():
    page = request.args.get('page', 1, type=int)
    per_page = 3
    sort_by = request.args.get('sort_by', 'created_at')
    order = request.args.get('order', 'desc')
    
    try:
        # Define valid sorting columns
        valid_sorts = {
            'username': Task.username,
            'email': Task.email,
            'completed': Task.completed,
            'created_at': Task.created_at
        }
        
        # Get sort column
        sort_column = valid_sorts.get(sort_by, Task.created_at)
        
        # Apply sorting
        if order == 'desc':
            sort_column = desc(sort_column)
        else:
            sort_column = asc(sort_column)
        
        # Get paginated tasks
        pagination = Task.query.order_by(sort_column).paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        tasks = [task.to_dict() for task in pagination.items]
        
        response_data = {
            'tasks': tasks,
            'total': pagination.total,
            'pages': pagination.pages,
            'current_page': page,
            'per_page': per_page
        }
        
        return jsonify(response_data)
    except Exception as e:
        logger.error("Error in get_tasks:", str(e))
        return jsonify({'error': str(e)}), 500

@main_bp.route('/api/tasks', methods=['POST'])
@async_route
async def create_task():
    try:
        data = request.get_json()
        
        if not all(key in data for key in ['username', 'email', 'text']):
            return jsonify({'error': 'Missing required fields'}), 400
        
        task = Task(
            username=data['username'],
            email=data['email'],
            text=data['text']
        )
        
        db.session.add(task)
        db.session.commit()

        return jsonify(task.to_dict()), 201
    except Exception as e:
        logger.error("Error in create_task:", str(e))
        return jsonify({'error': str(e)}), 500

@main_bp.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    try:
        task = Task.query.get_or_404(task_id)
        data = request.get_json()
        
        if 'text' in data:
            task.text = data['text']
        if 'completed' in data:
            task.completed = data['completed']
        
        db.session.commit()
        return jsonify(task.to_dict())
    except Exception as e:
        logger.error("Error in update_task:", str(e))
        return jsonify({'error': str(e)}), 500

@main_bp.route('/api/login', methods=['POST'])
@async_route
async def login():
    try:
        data = request.get_json()
        
        if not data or not data.get('username') or not data.get('password'):
            return jsonify({'error': 'Missing username or password'}), 400
        
        admin = Admin.query.filter_by(username=data['username']).first()
        
        if admin and admin.check_password(data['password']):
            access_token = create_access_token(identity=admin.username)
            return jsonify({'access_token': access_token})
        
        return jsonify({'error': 'Invalid credentials'}), 401
    except Exception as e:
        logger.error("Error in login:", str(e))
        return jsonify({'error': str(e)}), 500
