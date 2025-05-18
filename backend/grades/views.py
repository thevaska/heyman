from rest_framework import viewsets, permissions
from .models import Grade
from .serializers import GradeSerializer

class GradeViewSet(viewsets.ModelViewSet):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'teacher':
            return Grade.objects.filter(teacher=user)
        elif user.role == 'student':
            return Grade.objects.filter(student=user)
        elif user.role == 'parent':
            return Grade.objects.filter(student__parent=user)
        return Grade.objects.none()

    def perform_create(self, serializer):
        serializer.save(teacher=self.request.user)