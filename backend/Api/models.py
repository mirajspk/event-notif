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
    name = models.CharField(max_length=255)  # Event/workshop name
    location = models.CharField(max_length=255)  # Location of the event/workshop
    date = models.DateField()  # Date of the event/workshop
    host = models.CharField(max_length=50, choices=CLUB_CHOICES)  # Host club
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)  # Type: Event or Workshop
    registration_link = models.URLField(max_length=500)  # Link for registration

    def __str__(self):
        return f"{self.name} ({self.type}) by {self.host}"
