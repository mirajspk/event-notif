from django.contrib.auth.models import AbstractUser 
# Here abstracuser is used to extnd django default user model while keeping its authentication sytem intact
from django.db import models


class User(AbstractUser):
    USER_TYPE_CHOICES = [
        ('ADMIN', 'Admin'),
        # The first ADMIN is the value that is stored in the database while the second value is the human readable value the value that is stord in the database
        ('PARTICIPANT', 'Participant')
    ]
    
    username = models.CharField(max_length=100, unique=True) # unique = ture means no two user can have same username
    email = models.EmailField(unique=False)  
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='PARTICIPANT')
    club = models.ForeignKey("Clubs", on_delete=models.SET_NULL, null=True, blank=True, related_name='admins')
    # Check if the user is admin
    def is_admin_user(self):
        return self.user_type == 'ADMIN'
    # Returns the readable representaion of the user
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
        ('KUARC','Kathmandu University Architecture Students Club'),
        ('KURC','Kathmandu University Robotics Club',),
        ('KUCEC','Kathmandu University Civil Engineering Club'),
        ('SEEE','Society of Electrical and Electronic Engineers',),
        ('KUSMC','Kathmandu University Society of Music and Clulture'),
        ('AMES','Association of Mechanical Engineering'),
        ('KUCMC','Compuatiional Mathematics Club'),
        ('FECAM','Forum for Environmental Conservation and Management'),
        ('FoP','Forum of Pharmacy'),
        ('GES','Geomatics Engineering Society'),
        ('KUCONC','Kathmandu University Circle of Noble Chemineers'),
        ('NSCS','Natural and Social Concern Society',),
        ('KUBIC','Biotechnology Creatives',),
        ('SBIS','Society of business Information Student',),
        ('KUAIC','Artificial Intellengence Club'),
        ('KUGIC','Kathmandu University Indoors Games Club'),
    ]

    TYPE_CHOICES = [
        ('event', 'event'),
        ('workshop', 'workshop'),
    ]

    # Fields for the Event Model
    name = models.CharField(max_length=2555, null= True)  # Event/workshop name
    location = models.CharField(max_length=2555, null = True)  # Location of the event/workshop
    date = models.DateField()  # Date of the event/workshop
    host = models.ForeignKey(Clubs, on_delete=models.CASCADE)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)  # Type: Event or Workshop
    registration_link = models.URLField(max_length=500, blank= True)  # Link for registration
    startTime= models.CharField(max_length=50)  # New Time field
    description = models.TextField(null= True, blank=True)  # New Description field
    image = models.ImageField(upload_to="events/", null=True)  # Store image 
    # imageTwo = models.ImageField(upload_to="events/",blank=True, null=True)  # Store image
    created_by = models.CharField(max_length=500, choices=CLUB_CHOICES, null=True, blank=True) 



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
    email = models.EmailField(unique=False)
    clubs = models.ManyToManyField(Clubs, related_name="subscribers")  
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        club_names = ", ".join([club.club_name for club in self.clubs.all()])
        return f"{self.email} subscribed to {club_names}" if club_names else f"{self.email} (No clubs subscribed)"


