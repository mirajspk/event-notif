from django.db import models

from django.db import models

class Event(models.Model):
    # Choices for 'Host'
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

    # Choices for 'Type'
    TYPE_CHOICES = [
        ('Event', 'Event'),
        ('Workshop', 'Workshop'),
    ]

    # Fields for the Event Model
    title = models.CharField(max_length=2555, null= True)  # Event/workshop name
    location = models.CharField(max_length=2555, null = True)  # Location of the event/workshop
    date = models.DateField()  # Date of the event/workshop
    host = models.CharField(max_length=500, choices=CLUB_CHOICES)  # Host club
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)  # Type: Event or Workshop
    registration_link = models.URLField(max_length=500)  # Link for registration
    startTime= models.CharField(max_length=50, blank=True)  # New Time field
    description = models.TextField(null= True, blank=True)  # New Description field
    image = models.ImageField(upload_to="events/",blank=True, null=True)  # Store image 
    imageTwo = models.ImageField(upload_to="events/",blank=True, null=True)  # Store image


    def __str__(self):
        return f"{self.name} ({self.type}) by {self.host}"


class Clubs(models.Model):
    club_name = models.CharField(max_length=30) # Name of the club
    club_description = models.CharField(max_length=1000)
