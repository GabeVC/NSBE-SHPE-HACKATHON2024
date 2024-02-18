from flask import Flask, request, jsonify
from person_class import Person
from flask_cors import CORS
from flask_cors import cross_origin
from community_class import community
import requests 
import math



app = Flask(__name__)
CORS(app, origins="http://localhost:3000")
users = []

ALPHA_VANTAGE_API_KEY = 'NZVS9E5I7YNB61AF'
ALPHA_VANTAGE_NEWS_ENDPOINT = 'https://www.alphavantage.co/query'

@app.route('/api/goal', methods=['POST'])
def set_goal():
    
    # Parse data sent from the frontend
    data = request.get_json()
    
    # Assume that 'data' contains 'name', 'id', 'userName', 'password', 'number', 'period', 'goal_value', 'payment_option'
    person = Person(
        name=data['name'], 
        id=data['id'], 
        userName=data['userName'], 
        password=data['password'], 
        number=data['number'], 
        period=data['period']
    )
    
    # Call the setGoal method with the data from the frontend
    person.setGoal(value=data['goal_value'], paymentOption=data['payment_option'], period=data['period'])
    
    # Save the person object or update it in your data store here if necessary
    
    # Return a success message to the frontend
    return jsonify({"success": True, "message": "Goal set!"})


@app.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login_user():
    try:
        print("HELLO\n")
        data = request.json
        username = data.get('username')
        password = data.get('password')
        
        for user in users:
            print(user[0])
        # Check if the username exists in the list of tupless
        user = next((u for u in users if u[0] == username), None)

        if user is None:
            return jsonify({"success": False, "user": None}), 404

        # Check if the password matches
        if user[1] == password:
            user[2].addFriend(Person("Doggo","boby", "go", 567))
            return jsonify({"success": True, "user": user[0]}), 200    
        else:
            return jsonify({"success": False, "user": None}), 401
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
        


@app.route('/signup', methods=['POST'])
@cross_origin(supports_credentials=True)
def register_user():
        data = request.json
        print("howdy")
        new_person = Person(
            name=data.get('name'),
            userName=data.get('user'),
            password=data.get('pass'),
            number=data.get('number'),
        )
        users.append((data.get('name'), data.get('user'), new_person))
        return jsonify({'message': 'Patient data received and processed successfully.'}), 200
        
@app.route('/api/finance-news', methods=['GET'])
def get_finance_news():
    params = {
        'function': 'NEWS_SENTIMENT',
        'apikey': ALPHA_VANTAGE_API_KEY
    }

    response = requests.get(ALPHA_VANTAGE_NEWS_ENDPOINT, params=params)
    if response.status_code == 200:
        news_articles = response.json()['feed']  # Adjust based on actual response structure
        top_articles = news_articles[:3]  # Select the top 3 news articles
        return jsonify(top_articles)
    else:
        return jsonify({"error": "Failed to fetch news"}), response.status_codes
    
@app.route('/friends', methods=['GET'])
def get_friends():
    try:
        print("HELLO")
        # Retrieve the username from the query parameters
        username = request.args.get('username')
        
        # Check if the user exists in the users list
        user = next((user for user in users if user[0] == username), None)
        friends = []
        if user:
            # Assuming the third element of the tuple is a list of friend usernames
            for friend in user[2].friends:
                print(friend.name)
                friends.append((friend.name, math.ceil(friend.percentSeason+(5/52)*100)))
            return jsonify(friends)
        else:
            # If the username is not found, return an error message
            return jsonify({"message": "User not found"}), 404
    except Exception as e:
        # Return a server error message in case of an exception
        return jsonify({"error": str(e)}), 500
        
@app.route('/search', methods=['GET'])
def search_friends():
    try:
        # Retrieve the search query from the query parameters
        search_query = request.args.get('query')
        
        # Search for potential matches in the list of users
        matches = [user[0] for user in users if search_query.lower() in user[0].lower()]
        
        return jsonify(matches), 200
    except Exception as e:
        # Return a server error message in case of an exception
        return jsonify({"error": str(e)}), 500
    
@app.route('/add-friend', methods=['POST'])
def add_friend():
    try:
       
        # Parse data sent from the frontend
        data = request.json
        print("I'm here")
        # Extract necessary information from the data
        username = data.get('username')
        print(username+"!!!")
        friend_username = data.get('friend_username')
        print(friend_username+"!!!")
        # Find the user object based on the username
        user = next((user for user in users if user[0] == username), None)
        print(user.name)
        friend = next((user for user in users if user[0] == friend_username), None)
        print(friend.name)
        
        if user and friend:
            # Add friend to user's friend list (assuming friends is the list of friends in the user object)
            user[2].addFriend(friend)
            print("Hi")
            
            # Return a success response
            return jsonify({"success": True, "message": f"{friend_username} added you as a friend."}), 200, 200
        else:
            return jsonify({"success": False, "message": "User or friend not found."}), 404
    
    except Exception as e:
        # Return a server error message in case of an exception
        return jsonify({"error": str(e)}), 500

@app.route('/community', methods=['GET'])
def get_communities():
    try:
        username = request.args.get('username')
        user = next((user for user in users if user[0] == username), None)
        communities = []
        if user:
            for c in user[2].community:
                people = [p.name for p in c.people]
                communities.append({"name": c.name, "community_goal_percent": c.community_goal_percent, "people": people})
            return jsonify(communities), 200
        else:
            return jsonify({"message": "Community not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/Seegoal', methods=['GET'])
def see_goal():
    try:
        print("hello2")
        username = request.args.get('username')
        user = next((user for user in users if user[0] == username), None)
        if user:
            print("hello")
            goal = 100
            print("hello4")
           # Assuming user is a dictionary or an object with attributes. Adjust accordingly.
            stats = {"goal": goal}
            print("hello3")
            return jsonify(stats), 200
        else:
            return jsonify(False), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
        
        
@app.route('/setGoal', methods=['POST'])
def goal_set():
    try:
        # Parse data sent from the frontend
        data = request.json
        
        # Extract necessary information from the data
        username = data.get('username')
        goal_value = data.get('goal_value')
        payment = data.get('weekly_saving')
        
        # Find the user object based on the username
        user = next((user for user in users if user[0] == username), None)
        
        if user:
            # Update the user's Person object with the received goal data
            user[2].setGoal(goal_value, payment)
            print(user[2].goal)
            print(user[2].payment)
            
            # Calculate weeks needed here if necessary
            
            # Return a success response with weeksNeeded if calculated
            # You can adjust this response as needed based on your requirements
            return jsonify({"success": True, "weeksNeeded": user[2].payment}), 200
        else:
            return jsonify({"success": False, "message": "User not found"}), 404
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
if __name__ == "__main__":
    app.run(debug=True)
