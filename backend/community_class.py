from person_class import Person

class community:
    def __init__(self, name, id):
        self.name = name
        self.id = id
        self.community_goal_precent = 0.0
        self.people = []
    
    def updateCommunityGoal(self):
        totalPercent = 0
        for person in self.people:
            totalPercent += person.percentSeason
        self.community_goal_precent = totalPercent / (len(self.people))
        
    def addPerson(self, person):
        for p in self.people:
            if person.id == p.id:
                return
        self.people.append(person)
        self.updateCommunityGoal()
    
    def removePerson(self, person):
        for p in self.people:
            if person.id == p.id:
                self.people.remove(person)
                break
        self.updateCommunityGoal()