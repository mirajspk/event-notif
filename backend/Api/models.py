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

        ('KUCC','Kathmandu University Computer Club' ),
        ('AMES','Association of Mechanical Engineering'),
        ('KUCMC','Compuatiional Mathematics Club'),
        ('FECAM','Forum for Environmental Conservation and Management'),
        ('FoP','Forum of Pharmacy'),
        ('KUARC','Kathmandu University Architecture Students Club'),
        ('GES','Geomatics Engineering Society'),
        ('KUCONC','Kathmandu University Circle of Noble Chemineers'),
        ('KUCEC','Kathmandu University Civil Engineering Club'),
        ('KUCC','Kathmandu University Computer Club'),
        ('NSCS','Natural and Social Concern Society',),
        ('KURC','Kathmandu University Robotics Club',),
        ('KUBIC','Biotechnology Creatives',),
        ('SEEE','Society of Electrical and Electronic Engineers',),
        ('SBIS','Society of business Information Student',),
        ('KUAIC','Artificial Intellengence Club'),
        ('KUGIC','Kathmandu University Indoors Games Club'),
        ('KUSMC','Kathmandu University Society of Music and Clulture'),
    ]

    TYPE_CHOICES = [
        ('Event', 'Event'),
        ('Workshop', 'Workshop'),
    ]

    # Fields for the Event Model
    name = models.CharField(max_length=2555, null= True)  # Event/workshop name
    location = models.CharField(max_length=2555, null = True)  # Location of the event/workshop
    date = models.DateField()  # Date of the event/workshop
    host = models.CharField(max_length=500, choices=CLUB_CHOICES)  # Host club
    type = models.CharField(max_length=50)  # Type: Event or Workshop
    registration_link = models.URLField(max_length=500)  # Link for registration
    startTime= models.CharField(max_length=50, blank=True)  # New Time field
    description = models.TextField(null= True, blank=True)  # New Description field
    # image = models.ImageField(upload_to="events/",blank=True, null=True)  # Store image 
    # imageTwo = models.ImageField(upload_to="events/",blank=True, null=True)  # Store image
    created_by = models.ForeignKey('User', on_delete=models.CASCADE, related_name='created_events', null=True, blank=True)

    def get_host_details(self, obj):
        return {
            'name': obj.host
        }

    def __str__(self):
        return f"{self.name} ({self.type}) by {self.host}"


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

    def __str__(self):
        return f"{self.email} subscribed to {self.club.club_name}"

