from django.db import models
from django.contrib.auth import get_user_model
from events.models import Event

User = get_user_model()

class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    is_completed = models.BooleanField(default=False)
    related_event = models.ForeignKey(Event, on_delete=models.CASCADE, null=True, blank=True)
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title