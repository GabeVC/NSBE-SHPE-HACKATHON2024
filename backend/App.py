from flask import Flask, request, jsonify
from person_class import Person
from flask_cors import CORS
from flask_cors import cross_origin
from community_class import community
import requests 



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
                friends.append((friend.name, friend.percentSeason))
            return jsonify(friends)
        else:
            # If the username is not found, return an error message
            return jsonify({"message": "User not found"}), 404
    except Exception as e:
        # Return a server error message in case of an exception
        return jsonify({"error": str(e)}), 500
        
@app.route('/communities', methods=['GET'])
def get_communitiess():
    try:
        print("HELLO")
        # Retrieve the username from the query parameters
        username = request.args.get('username')
        
        # Check if the user exists in the users list
        user = next((user for user in users if user[0] == username), None)
        communities = []
        if user:
            # Assuming the third element of the tuple is a list of friend usernames
            for c in user[2].community:
                print(c.name)
                communities.append((c.name, c.community_goal_precent, c.people))
            return jsonify(communities)
        else:
            # If the username is not found, return an error message
            return jsonify({"message": "Community not found"}), 404
    except Exception as e:
        # Return a server error message in case of an exception
        return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True)
