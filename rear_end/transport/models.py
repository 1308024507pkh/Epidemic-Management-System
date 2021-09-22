from django.db import models
from django.contrib.auth.models import AbstractUser
import datetime

# Create your models here.
class Transport(models.Model):
    No = models.CharField(max_length=128, unique=True)
    start_p = models.CharField(max_length=256)
    end_p = models.CharField(max_length=256)
    departure_date = models.DateField(default=datetime.date.today)
    danger_choices = [
        ('0', '无风险'),
        ('1', '低风险'),
        ('2', '高风险'),
        ('3', '非常危险',)
    ]
    danger_level = models.CharField(max_length = 20, choices = danger_choices, default = '0')
    register_id = models.CharField(max_length = 256)

    def __str__(self):
        return self.No

    class Meta:
        verbose_name = "班次"
        verbose_name_plural = "班次"

