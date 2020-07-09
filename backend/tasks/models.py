from django.db import models


# Create your models here.
class Task(models.Model):
    TASK_STATUS = (
        ('scheduled', 'SCHEDULED'),
        ('rescheduled', 'RESCHEDULED'),
        ('completed', 'COMPLETED')
    )

    title = models.CharField(max_length=200)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    status = models.CharField(max_length=11, choices=TASK_STATUS, default='scheduled', blank=True, null=True)

    def __str__(self):
        return self.title
