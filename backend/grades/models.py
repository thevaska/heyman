from django.db import models
from django.contrib.auth import get_user_model
from tasks.models import Task

User = get_user_model()

class Grade(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='grades')
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='grades_received')
    teacher = models.ForeignKey(User, on_delete=models.CASCADE, related_name='grades_given')
    value = models.CharField(max_length=10)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.username} - {self.value} ({self.task.title})"