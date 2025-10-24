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
            sh '''
                # Copy docker-compose.prod.yml lên EC2
                scp -o StrictHostKeyChecking=no -i $SSH_KEY docker-compose.prod.yml ''' + EC2_HOST + ''':/home/ec2-user/app/docker-compose.yml
                
                # SSH và deploy
                ssh -o StrictHostKeyChecking=no -i $SSH_KEY ''' + EC2_HOST + ''' "
                    cd /home/ec2-user/app
                    
                    # Login DockerHub
                    echo $DOCKER_PASS | sudo docker login -u $DOCKER_USER --password-stdin
                    
                    # Pull images mới
                    sudo docker compose pull
                    
                    # Stop và remove containers cũ (bao gồm orphans)
                    sudo docker compose down --remove-orphans
                    
                    # Force remove containers nếu vẫn tồn tại
                    sudo docker rm -f backend frontend 2>/dev/null || true
                    
                    # Start containers mới với images mới
                    sudo docker compose up -d
                    
                    # Logout
                    sudo docker logout
                    
                    # Xem logs để kiểm tra
                    sudo docker compose logs --tail=50
                "
            '''
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