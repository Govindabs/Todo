# Generated by Django 3.0.8 on 2020-07-07 17:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='status',
            field=models.CharField(choices=[('scheduled', 'SCHEDULED'), ('rescheduled', 'RESCHEDULED'), ('completed', 'COMPLETED')], default='scheduled', max_length=11),
        ),
    ]