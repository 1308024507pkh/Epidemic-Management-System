from django.db import models

# Create your models here.
from django.db import models

# Create your models here.
from django.db import models


# Create your models here.
class Population_flow(models.Model):
    Province_source = models.CharField(max_length=20, primary_key=True)
    Province_destination = models.CharField(max_length=20)
    Amount = models.IntegerField()
    # 注：这里的datefield字段的格式是2020-05-31这样子的，一定要保证前端传过来的格式也是这样的
    Date = models.CharField(max_length=10)


class News(models.Model):
    News_id = models.CharField(max_length=30, primary_key=True)
    Time = models.CharField(max_length=30)
    Province = models.CharField(max_length=20)
    Type = models.CharField(max_length=20)
    Content = models.CharField(max_length=1000)


# 现在两张表名叫做 server_news 和server_population_flow


# 用于测试前后端的连接
class test(models.Model):
    Province_source = models.CharField(max_length=20, primary_key=True)
    Province_destination = models.CharField(max_length=20)
    Amount = models.IntegerField()


class flow(models.Model):
    Province_source = models.CharField(max_length=20)
    Province_destination = models.CharField(max_length=20)
    Amount = models.IntegerField()
    # 注：这里的datefield字段的格式是2020-05-31这样子的，一定要保证前端传过来的格式也是这样的
    Date = models.CharField(max_length=10)