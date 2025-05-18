from django.urls import path
from .views import user_children, user_stats, UserProfileView, UserCreateView, global_stats

urlpatterns = [
    path('children/', user_children, name='user-children'),
    path('stats/', user_stats, name='user-stats'),
    path('me/', UserProfileView.as_view(), name='my-profile'),
    path('register/', UserCreateView.as_view(), name='register'),
    path('api/stats/', global_stats, name='global-stats'),
]