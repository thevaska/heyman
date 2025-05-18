from rest_framework import viewsets, permissions
from .models import Task
from .serializers import TaskSerializer
from datetime import timedelta
from django.utils import timezone

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        cutoff = timezone.now() - timedelta(days=30)
        return Task.objects.filter(created_at__gte=cutoff)