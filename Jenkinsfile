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
        withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'SSH_KEY', usernameVariable: 'SSH_USER')]) {
            sh """
                # Copy SSH key và set permissions
                mkdir -p ~/.ssh
                cp \$SSH_KEY ~/.ssh/deploy_key
                chmod 600 ~/.ssh/deploy_key
                
                # SSH vào EC2 và deploy
                ssh -i ~/.ssh/deploy_key -o StrictHostKeyChecking=no ${EC2_HOST} '
                    cd /home/ec2-user/app &&
                    docker compose pull &&
                    docker compose down &&
                    docker compose up -d
                '
                
                # Cleanup
                rm ~/.ssh/deploy_key
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