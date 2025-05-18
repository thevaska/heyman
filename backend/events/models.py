from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Event(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='events', null=True, blank=True)
    participants = models.ManyToManyField(User, related_name='participated_events', blank=True)
    attachment = models.FileField(upload_to='attachments/', null=True, blank=True)

    def __str__(self):
        return self.title