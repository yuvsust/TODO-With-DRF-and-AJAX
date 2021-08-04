from django.db import models


class TaskManager(models.Manager):
    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.order_by('-id')
        return queryset


class Task (models.Model):
    title = models.CharField(max_length=50)
    completed = models.BooleanField(default=False)
    objects = TaskManager()

    def __str__(self):
        return self.title
