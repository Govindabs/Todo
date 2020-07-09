from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer
from todo_app.settings import EMAIL_HOST_USER
from django.core.mail import send_mail


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class NotifyView(APIView):
    def post(self, request):
        id = request.data["id"]
        task = Task.objects.get(pk=id)

        subject = 'Task notification'
        message = """Hi {name},
                Your task has been {status}.
                """.format(name=task.name, status=task.status)
        recepient = str(task.email)
        send_mail(subject, message, EMAIL_HOST_USER, [recepient], fail_silently=False)

        return Response({"status": "Success"})
