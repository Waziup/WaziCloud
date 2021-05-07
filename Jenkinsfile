pipeline {
  agent any
  environment {
    PLATFORM_VER = "ci-build-${env.BUILD_ID}"
    API_URL  = 'http://localhost:800/api/v2'
    MQTT_URL = 'tcp://localhost:3883'
  }
  stages {
    stage('Prepare') {
      steps {
        sh 'echo Build ${BUILD_ID}'
        sh 'git submodule update --remote --recursive'
        sh 'sudo chmod 777 data/* -R'
        dir("tests") {
           sh 'npm install'
        }
      }
    }
    stage('Build') {
      steps {
        sh 'docker-compose build'
      }
    }
    stage('Run') {
      steps {
        sh 'docker-compose -f docker-compose.yml -f docker-compose-first-run.yml up > log_platform.txt &'
        script {
          timeout(unit: 'SECONDS', time: 600) {
            waitUntil {
                def r = sh script: "wget -q http://localhost:800/api/v2/devices -O /dev/null", returnStatus: true
                return r == 0
            }
          }
        }
      }
    }
    stage('Test') {
      steps {
        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
          dir("tests") {
            sh 'npm run test_jenkins'
          }
        }
      }
    }
    stage('Finalize') {
      steps {
        sh 'docker-compose down'
      }
    }
  }
  post {
    always {
      junit 'tests/report.xml'
    }
    success {
      echo 'Success!'
    }
    failure {
      echo 'Failure!'
    }
    unstable {
      echo 'Unstable'
    }
  }
}
