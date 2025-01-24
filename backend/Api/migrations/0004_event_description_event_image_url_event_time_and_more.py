# Generated by Django 5.1.4 on 2025-01-24 16:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Api', '0003_clubs'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='image_url',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='time',
            field=models.TimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='host',
            field=models.CharField(choices=[('Coding Club', 'Coding Club'), ('Music Club', 'Music Club'), ('Drama Club', 'Drama Club'), ('Sports Club', 'Sports Club'), ('Photography Club', 'Photography Club'), ('Literature Club', 'Literature Club'), ('Art Club', 'Art Club'), ('Environment Club', 'Environment Club'), ('Robotics Club', 'Robotics Club'), ('Science Club', 'Science Club')], max_length=500),
        ),
        migrations.AlterField(
            model_name='event',
            name='location',
            field=models.CharField(max_length=2555),
        ),
        migrations.AlterField(
            model_name='event',
            name='name',
            field=models.CharField(max_length=2555),
        ),
    ]
