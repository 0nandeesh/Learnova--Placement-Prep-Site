# AI/ML learning resources and materials
AIML_RESOURCES = {
    "courses": [
        {
            "id": 1,
            "title": "Machine Learning Fundamentals",
            "provider": "Coursera",
            "description": "Learn the basics of machine learning algorithms and techniques",
            "link": "https://www.coursera.org/specializations/machine-learning-introduction",
            "duration": "3 months"
        },
        {
            "id": 2,
            "title": "Deep Learning Specialization",
            "provider": "DeepLearning.AI",
            "description": "Master deep learning and neural networks",
            "link": "https://www.coursera.org/specializations/deep-learning",
            "duration": "5 months"
        },
        {
            "id": 3,
            "title": "Machine Learning (Andrew Ng)",
            "provider": "Coursera",
            "description": "Classical machine learning algorithms and practical advice from Andrew Ng.",
            "link": "https://www.coursera.org/learn/machine-learning",
            "duration": "11 weeks"
        },
        {
            "id": 4,
            "title": "Kaggle Learn: Micro-Courses",
            "provider": "Kaggle",
            "description": "Short, hands-on micro-courses to build data science and ML skills.",
            "link": "https://www.kaggle.com/learn",
            "duration": "Self-paced"
        }
    ],
    "projects": [
        {
            "id": 1,
            "title": "Image Classification with CNN",
            "description": "Build a Convolutional Neural Network for classifying images",
            "category": "Computer Vision",
            "dataset": "CIFAR-10",
            "technologies": ["Python", "TensorFlow", "Keras"],
            "tutorial": "https://github.com/tensorflow/docs/blob/master/site/en/tutorials/images/cnn.ipynb"
        },
        {
            "id": 2,
            "title": "Natural Language Processing",
            "description": "Create a sentiment analysis model using BERT",
            "category": "NLP",
            "dataset": "IMDB Reviews",
            "technologies": ["Python", "PyTorch", "Transformers"],
            "tutorial": "https://github.com/huggingface/transformers/blob/main/examples/pytorch/text-classification/run_glue.py"
        },
        {
            "id": 3,
            "title": "Time Series Forecasting",
            "description": "Predict future values using LSTM networks",
            "category": "Time Series",
            "dataset": "Stock Market Data",
            "technologies": ["Python", "TensorFlow", "Pandas"],
            "tutorial": "https://github.com/tensorflow/docs/blob/master/site/en/tutorials/structured_data/time_series.ipynb"
        },
        {
            "id": 4,
            "title": "House Price Prediction (Regression)",
            "description": "Predict home prices using regression techniques on real-world datasets (Kaggle House Prices).",
            "category": "Regression",
            "dataset": "Kaggle - House Prices",
            "technologies": ["Python", "scikit-learn", "Pandas"],
            "tutorial": "https://www.kaggle.com/c/house-prices-advanced-regression-techniques"
        },
        {
            "id": 5,
            "title": "Image Classification (CIFAR-10)",
            "description": "Build and train a CNN to classify images from the CIFAR-10 dataset.",
            "category": "Computer Vision",
            "dataset": "CIFAR-10",
            "technologies": ["Python", "TensorFlow", "Keras", "PyTorch"],
            "tutorial": "https://www.kaggle.com/c/cifar-10"
        },
        {
            "id": 6,
            "title": "Sentiment Analysis (Twitter)",
            "description": "Analyze tweet sentiment using LSTM/transformer models and word embeddings.",
            "category": "NLP",
            "dataset": "Twitter Sentiment Datasets",
            "technologies": ["Python", "TensorFlow", "Keras", "NLTK"],
            "tutorial": "https://www.kaggle.com/c/twitter-sentiment-analysis2"
        },
        {
            "id": 7,
            "title": "Movie Recommendation System",
            "description": "Create a recommendation engine using collaborative filtering techniques on MovieLens data.",
            "category": "Recommender Systems",
            "dataset": "MovieLens",
            "technologies": ["Python", "Surprise", "Pandas"],
            "tutorial": "https://github.com/khanhnamle1994/movielens"
        },
        {
            "id": 8,
            "title": "Handwritten Digit Recognition (MNIST)",
            "description": "Train a neural network to classify handwritten digits (MNIST).",
            "category": "Computer Vision",
            "dataset": "MNIST",
            "technologies": ["Python", "TensorFlow", "Keras"],
            "tutorial": "https://www.tensorflow.org/tutorials/quickstart/beginner"
        },
        {
            "id": 9,
            "title": "Customer Churn Prediction",
            "description": "Predict customer churn using classification models and feature engineering.",
            "category": "Classification",
            "dataset": "Telco Customer Churn",
            "technologies": ["Python", "scikit-learn", "Pandas"],
            "tutorial": "https://www.kaggle.com/blastchar/telco-customer-churn"
        }
    ],
    "learning_paths": [
        {
            "id": 1,
            "title": "Machine Learning Engineer Path",
            "duration": "6-8 months",
            "prerequisites": ["Python", "Linear Algebra", "Statistics"],
            "steps": [
                "Learn Python programming fundamentals",
                "Master data preprocessing with NumPy and Pandas",
                "Study machine learning algorithms",
                "Practice with scikit-learn",
                "Deploy ML models in production"
            ]
        },
        {
            "id": 2,
            "title": "Deep Learning Specialist Path",
            "duration": "8-10 months",
            "prerequisites": ["Python", "Machine Learning Basics", "Mathematics"],
            "steps": [
                "Neural network fundamentals",
                "Deep learning frameworks (PyTorch/TensorFlow)",
                "Computer vision applications",
                "Natural language processing",
                "Generative models and GANs"
            ]
        }
    ],
    "resources": [
        {
            "id": 1,
            "title": "Machine Learning Crash Course",
            "description": "Google's fast-paced, practical introduction to machine learning",
            "type": "Online Course",
            "link": "https://developers.google.com/machine-learning/crash-course"
        },
        {
            "id": 2,
            "title": "Fast.ai Course",
            "description": "Practical deep learning for coders with fastai library",
            "type": "Course + Library",
            "link": "https://www.fast.ai"
        },
        {
            "id": 3,
            "title": "Papers with Code",
            "description": "Browse state-of-the-art ML papers with code implementations",
            "type": "Research",
            "link": "https://paperswithcode.com"
        },
        {
            "id": 4,
            "title": "Kaggle",
            "description": "Platform for data science competitions and learning",
            "type": "Practice",
            "link": "https://www.kaggle.com"
        },
        {
            "id": 5,
            "title": "Scikit-learn Documentation",
            "description": "Official scikit-learn user guide and API reference",
            "type": "Docs",
            "link": "https://scikit-learn.org/stable/user_guide.html"
        },
        {
            "id": 6,
            "title": "TensorFlow Tutorials",
            "description": "Official TensorFlow tutorials and guides",
            "type": "Docs/Tutorials",
            "link": "https://www.tensorflow.org/tutorials"
        },
        {
            "id": 7,
            "title": "PyTorch Tutorials",
            "description": "Official PyTorch tutorials and examples",
            "type": "Docs/Tutorials",
            "link": "https://pytorch.org/tutorials/"
        },
        {
            "id": 8,
            "title": "Andrew Ng’s Machine Learning",
            "description": "Stanford/Andrew Ng's classic machine learning course on Coursera",
            "type": "Course",
            "link": "https://www.coursera.org/learn/machine-learning"
        },
        {
            "id": 9,
            "title": "Machine Learning Mastery",
            "description": "Practical tutorials and guides for applied machine learning",
            "type": "Blog/Tutorials",
            "link": "https://machinelearningmastery.com/"
        }
    ]
}