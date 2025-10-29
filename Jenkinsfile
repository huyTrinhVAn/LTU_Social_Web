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
                        # Copy docker-compose.prod.yml
                        scp -o StrictHostKeyChecking=no -i \$SSH_KEY docker-compose.prod.yml ${EC2_HOST}:/home/ec2-user/app/docker-compose.yml
                        
                        # Copy Nginx config
                        scp -o StrictHostKeyChecking=no -i \$SSH_KEY nginx.conf ${EC2_HOST}:/home/ec2-user/app/nginx.conf
                        
                        # Deploy
                        ssh -o StrictHostKeyChecking=no -i \$SSH_KEY ${EC2_HOST} '
                            cd /home/ec2-user/app
                            
                            # Install Nginx if not exists
                            if ! command -v nginx &> /dev/null; then
                                echo "📦 Installing Nginx..."
                                sudo yum install nginx -y
                                sudo systemctl enable nginx
                            fi
                            
                            # Backup old config
                            sudo cp /etc/nginx/conf.d/latrobeweb.conf /etc/nginx/conf.d/latrobeweb.conf.backup 2>/dev/null || true
                            
                            # Copy new Nginx config
                            sudo cp nginx.conf /etc/nginx/conf.d/latrobeweb.conf
                            
                            # Test Nginx config
                            if sudo nginx -t; then
                                echo "✅ Nginx config is valid"
                                sudo systemctl restart nginx
                            else
                                echo "❌ Nginx config is invalid, restoring backup"
                                sudo cp /etc/nginx/conf.d/latrobeweb.conf.backup /etc/nginx/conf.d/latrobeweb.conf 2>/dev/null || true
                                exit 1
                            fi
                            
                            # Login Docker
                            echo '${DOCKER_PASS}' | sudo docker login -u ${DOCKER_USER} --password-stdin
                            
                            # Deploy containers
                            sudo docker compose down --remove-orphans || true
                            sudo docker rm -f backend frontend 2>/dev/null || true
                            sudo docker compose pull
                            sudo docker compose up -d
                            
                            # Verify deployment
                            echo "🐳 Docker containers:"
                            sudo docker compose ps
                            
                            echo "🌐 Nginx status:"
                            sudo systemctl status nginx --no-pager -l
                            
                            # Test endpoints
                            sleep 5
                            echo "🧪 Testing backend health:"
                            curl -f http://localhost:5000/api/auth/me || echo "Backend not ready yet"
                            
                            echo "🧪 Testing frontend:"
                            curl -f http://localhost:3000 || echo "Frontend not ready yet"
                            
                            echo "🧪 Testing Nginx proxy:"
                            curl -f http://localhost/health || echo "Nginx health check failed"
                            
                            # Logout
                            sudo docker logout
                            
                            echo "✅ Deployment completed!"
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
            echo '✅ Pipeline completed successfully!'
            echo '🚀 Application deployed to EC2'
            echo '🌐 Access: http://latrobeweb.duckdns.org'
            echo '📊 API: http://latrobeweb.duckdns.org/api'
        }
        failure {
            echo '❌ Pipeline failed!'
            echo '📝 Check logs above for details'
        }
    }
}