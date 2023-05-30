pipeline {
    environment {
        imagename = "course-backend"
        dockerCredential = 'docker-token'
        dockerImage = ''

    }
    agent any 

    stages {
        stage('Cloning Git') {
            steps {
            git([url: 'https://github.com/lade6501/course-backend.git', branch: 'master', credentialsId: 'git_token'])
            }
        }

        stage('Building image') {
            steps {
                script {
                dockerImage = docker build -t  imagename .
                }
            }
        }

        stage('Deploy Image') {
            steps {
                script {
                    docker.withRegistry( '', dockerCredential ) {
                        dockerImage.push("$BUILD_NUMBER")
                        dockerImage.push('latest')
                    }
                }
            }
        }
    }
}
