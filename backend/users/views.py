from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import CustomUser
from .serializers import UserRegisterSerializer, UserProfileSerializer

from datetime import timedelta
from django.utils import timezone

class UserCreateView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserRegisterSerializer

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_stats(request):
    user = request.user
    return Response({
        "username": user.username,
        "role": user.role,
        "grades": user.grades_received.count() if hasattr(user, 'grades_received') else 0,
        "tasks": user.task_set.count() if hasattr(user, 'task_set') else 0
    })

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_children(request):
    user = request.user
    if user.role != 'parent':
        return Response({"detail": "Доступ заборонено"}, status=403)
    children = user.children.all()
    return Response(UserProfileSerializer(children, many=True).data)

from tasks.models import Task
from grades.models import Grade

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def global_stats(request):
    total_users = CustomUser.objects.count()
    students = CustomUser.objects.filter(role='student').count()
    teachers = CustomUser.objects.filter(role='teacher').count()
    parents = CustomUser.objects.filter(role='parent').count()

    total_tasks = Task.objects.count()
    completed_tasks = Task.objects.filter(status='done').count()

    total_grades = Grade.objects.count()

    return Response({
        "total_users": total_users,
        "students": students,
        "teachers": teachers,
        "parents": parents,
        "total_tasks": total_tasks,
        "completed_tasks": completed_tasks,
        "total_grades": total_grades,
    })
