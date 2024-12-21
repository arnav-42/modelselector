const models = {
    'Convolutional Neural Network (CNN)': 0,
    'Support Vector Machine (SVM)': 0,
    'Random Forest': 0,
    'Deep Neural Networks': 0,
    'Linear Regression': 0,
    'Decision Tree Regression': 0,
    'Gradient Boosting Machines (GBM)': 0,
    'K-Means': 0,
    'Hierarchical Clustering': 0,
    'DBSCAN': 0,
    'Generative Adversarial Network (GAN)': 0,
    'Variational Autoencoder (VAE)': 0
};

const questions = [
    { id: 1, text: "What is the main objective of your machine learning project?", type: "select", options: ["Classification", "Regression", "Clustering", "Generation"], impact: {
        'Classification': {'Convolutional Neural Network (CNN)': 3, 'Support Vector Machine (SVM)': 2, 'Random Forest': 2},
        'Regression': {'Linear Regression': 3, 'Decision Tree Regression': 2, 'Gradient Boosting Machines (GBM)': 2},
        'Clustering': {'K-Means': 3, 'Hierarchical Clustering': 2, 'DBSCAN': 1},
        'Generation': {'Generative Adversarial Network (GAN)': 3, 'Variational Autoencoder (VAE)': 2}
    }},
    { id: 2, text: "What type of data are you working with?", type: "select", options: ["Tabular", "Image", "Text", "Time-Series"], impact: {
        'Tabular': {'Random Forest': 2, 'Gradient Boosting Machines (GBM)': 1, 'Support Vector Machine (SVM)': 1},
        'Image': {'Convolutional Neural Network (CNN)': 3},
        'Text': {'DBSCAN': 2, 'Support Vector Machine (SVM)': 1},
        'Time-Series': {'Deep Neural Networks': 3}
    }},
    { id: 3, text: "Is your data labeled?", type: "select", options: ["Yes", "No"], impact: {
        'Yes': {'Support Vector Machine (SVM)': 1, 'Convolutional Neural Network (CNN)': 1, 'Random Forest': 1},
        'No': {'K-Means': 2, 'Hierarchical Clustering': 1}
    }},
    { id: 4, text: "Do you need the model to be interpretable?", type: "select", options: ["Yes", "No"], impact: {
        'Yes': {'Linear Regression': 2, 'Decision Tree Regression': 2},
        'No': {'Deep Neural Networks': 2, 'Convolutional Neural Network (CNN)': 1}
    }},
    { id: 5, text: "What is the size of your dataset?", type: "select", options: ["Small", "Medium", "Large"], impact: {
        'Small': {'Support Vector Machine (SVM)': 1, 'Decision Tree Regression': 1},
        'Large': {'Deep Neural Networks': 3, 'Gradient Boosting Machines (GBM)': 2}
    }}
];

function addQuestions() {
    const form = document.getElementById('modelForm');
    form.innerHTML = '';
    questions.forEach(question => {
        const div = document.createElement('div');
        const selectHTML = question.options.map(option => `<option value="${option}">${option}</option>`).join('');
        div.innerHTML = `<label>${question.text}</label><br><select id="answer${question.id}">${selectHTML}</select><br>`;
        form.appendChild(div);
    });
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.type = 'button';
    submitButton.onclick = processAnswers;
    form.appendChild(submitButton);
}

function processAnswers() {
    questions.forEach(q => {
        const selectedOption = document.getElementById(`answer${q.id}`).value;
        const impact = q.impact[selectedOption];
        for (const model in impact) {
            models[model] += impact[model];
        }
    });

    // Finding the top three models
    const sortedModels = Object.entries(models).sort((a, b) => b[1] - a[1]).slice(0, 3);
    const resultModels = sortedModels.map(m => `${m[0]} (${m[1]} points)`);
    document.getElementById('result').innerText = `Based on your answers, the suitable models might be: ${resultModels.join(', ')}`;
}

window.onload = function () {
    document.querySelector('button').onclick = function () {
        this.style.display = 'none'; // Hide start button
        addQuestions(); // Add questions on click
    };
}
