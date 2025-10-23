pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        BACKEND_IMAGE = 'huyvantrinh3008/ltu-backend'
        FRONTEND_IMAGE = 'huyvantrinh3008/ltu-frontend'
        EC2_HOST = 'ec2-user@3.27.241.75'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Docker DinD') {
            steps {
                sh '''
                    docker --version
                    docker compose version
                    docker info
                '''
            }
        }
        
        stage('Build Images') {
            steps {
                sh 'docker compose build'
            }
        }
        
        stage('Login to DockerHub') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        
        stage('Tag and Push Images') {
            steps {
                sh """
                    # Tag và push backend
                    docker tag huyvantrinh3008/ltu-backend:latest ${BACKEND_IMAGE}:latest
                    docker tag huyvantrinh3008/ltu-backend:latest ${BACKEND_IMAGE}:${BUILD_NUMBER}
                    docker push ${BACKEND_IMAGE}:latest
                    docker push ${BACKEND_IMAGE}:${BUILD_NUMBER}

                    # Tag và push frontend
                    docker tag huyvantrinh3008/ltu-frontend:latest ${FRONTEND_IMAGE}:latest
                    docker tag huyvantrinh3008/ltu-frontend:latest ${FRONTEND_IMAGE}:${BUILD_NUMBER}
                    docker push ${FRONTEND_IMAGE}:latest
                    docker push ${FRONTEND_IMAGE}:${BUILD_NUMBER}
                """
            }
        }
        
stage('Deploy to EC2') {
    steps {
        withCredentials([
            sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'SSH_KEY'),
            usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')
        ]) {
            sh """
                ssh -o StrictHostKeyChecking=no -i \$SSH_KEY ec2-user@3.27.241.75 '
                    sudo docker login -u \$DOCKER_USER -p \$DOCKER_PASS &&

                    sudo docker ps -aq | xargs -r sudo docker stop && 
                    sudo docker ps -aq | xargs -r sudo docker rm ||

                    sudo docker pull huyvantrinh3008/ltu-backend:latest &&
                    sudo docker pull huyvantrinh3008/ltu-frontend:latest &&

                    sudo docker run -d --name backend -p 5000:5000 huyvantrinh3008/ltu-backend:latest &&
                    sudo docker run -d --name frontend -p 3000:3000 huyvantrinh3008/ltu-frontend:latest
                '
            """
        }
    }
}
    }
    
    post {
        always {
            sh 'docker logout'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}