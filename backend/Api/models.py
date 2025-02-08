from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    USER_TYPE_CHOICES = [
        ('ADMIN', 'Admin'),
        ('PARTICIPANT', 'Participant')
    ]
    
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)  
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='PARTICIPANT')
    club = models.ForeignKey('Clubs', on_delete=models.SET_NULL, null=True, blank=True, related_name='admins')

    def is_admin_user(self):
        return self.user_type == 'ADMIN'

    def __str__(self):
        return f"{self.username} ({self.user_type})"


class Clubs(models.Model):
    club_name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)
    club_image = models.URLField(max_length=500, blank=True, null=True)

    def __str__(self):
        return str(self.club_name)


class Event(models.Model):
    CLUB_CHOICES = [
        ('Coding Club', 'Coding Club'),
        ('Music Club', 'Music Club'),
        ('Drama Club', 'Drama Club'),
        ('Sports Club', 'Sports Club'),
        ('Photography Club', 'Photography Club'),
        ('Literature Club', 'Literature Club'),
        ('Art Club', 'Art Club'),
        ('Environment Club', 'Environment Club'),
        ('Robotics Club', 'Robotics Club'),
        ('Science Club', 'Science Club'),
    ]

    TYPE_CHOICES = [
        ('Event', 'Event'),
        ('Workshop', 'Workshop'),
    ]

    name = models.CharField(max_length=255)  
    location = models.CharField(max_length=255)  
    date = models.DateField()
    host = models.ForeignKey('Clubs', on_delete=models.CASCADE)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)  
    registration_link = models.URLField(max_length=500)  

    description = models.TextField()
    created_by = models.ForeignKey('User', on_delete=models.CASCADE, related_name='created_events', null=True, blank=True)


class EventRegistration(models.Model):
    event = models.ForeignKey('Event', on_delete=models.CASCADE)
    registration_date = models.DateTimeField(auto_now_add=True)
    email = models.EmailField()

    class Meta:
        unique_together = ['event', 'email']


class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    clubs = models.ManyToManyField(Clubs)
    subscribed_at = models.DateTimeField(auto_now_add=True)
