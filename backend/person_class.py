from datetime import datetime, timedelta

#Alpha Vantage API Key: NZVS9E5I7YNB61AF

class Person:
    def __init__(self, name, userName, password, number ):
        self.name = name #name of the person
        self.id = userName #username 
        self.password = password #password
        self.number = number
        self.goal = 0.0 #goal of the person
        self.community = [] #community
        self.totalSaved = 0.0 #total amount saved
        self.period = None #period of time
        self.payment = 0.0 #payment
        self.paymentOwed = 0.0 #payment remaining for week
        self.friends = [] #List of person objects
        self.budgetingBin = {} #Dictionary of budgeting bins
        self.friendsGoal = 0 #goal of friends for year
        self.totalPercent = 0.0 #percent of goal reached
        self.percentSeason = 0 #percent of goal reached for season
        self.yearlyGoal = 0.0 #yearly goal
        self.goalSetDate = None #date goal was set
        self.paymentDueDate = None #date payment is due

        
    #calculate the percent saved   
    def calculatePercentSaved(self):
        self.totalPercent = self.totalSaved/self.goal
    
    def setGoal(self, value, paymentOption):
        self.goal = float(value)
        self.payment = float(paymentOption)
        self.paymentOwed = float(paymentOption)
        self.goalSetDate = datetime.now()
        iso_year, iso_week_number, _ = self.goalSetDate.isocalendar()
        self.percentSeason = (iso_week_number-1)/52
        self.paymentDueDate = self.goalSetDate + timedelta(days=7)
    
    
    #update the friends goal    
    def updateFriendsGoal(self):
        totalPercent = self.percentSeason
        for friend in self.friends:
            totalPercent += friend.percentSeason
        self.friendsGoal = totalPercent / (len(self.friends)+1)
    
    #add a friend to the friends list  
    def addFriend(self, friend):
        for f in self.friends:
            if friend.id == f.id:
                return
        self.friends.append(friend)
        self.updateFriendsGoal()

    #remove a friend from the friends list
    def removeFriend(self, friend):
        for f in self.friends:
            if friend.id == f.id:
                self.friends.remove(f)
                break
        self.updateFriendsGoal()
       
    def payPayment(self, value):
        #might not be able to pay said payment amount but pays something
        if (value > 0):
            self.totalSaved += float(value)
            iso_year, iso_week_number, _ = datetime.now().isocalendar()
            if iso_week_number == 1:
                self.percentSeason = 0.0
            if value >= self.payment:
                self.percentSeason += 1/52
                self.paymentOwed = 0
            else:
                self.paymentOwed -= value
                self.percentSeason += (value/self.payment)/52
        self.updateFriendsGoal()
        self.calculatePercentSaved()
    
    def addCommunity(self, a_community):
        for c in self.community:
            if a_community.id == c.id:
                return
        a_community.addPerson(self)
        self.community.append(a_community)
    
    def removeCommunity(self, a_community):
        for c in self.community:
            if a_community.id == c.id:
                c.removePerson(self)
                self.community.remove(c)
                break
        return
    

        
    def refresh(self):
        if self.paymentDueDate.day == datetime.now().day and self.paymentDueDate.month == datetime.now().month:
            self.paymentDueDate = self.goalSetDate + timedelta(days=7)
        self.paymentOwed = self.payment
        
          
        
    
     
    
        
        
        