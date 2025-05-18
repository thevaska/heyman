from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('student', 'Учень'),
        ('teacher', 'Вчитель'),
        ('parent', 'Батьки'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    children = models.ManyToManyField('self', symmetrical=False, related_name='parents', blank=True)

    def __str__(self):
        return f"{self.username} ({self.role})"