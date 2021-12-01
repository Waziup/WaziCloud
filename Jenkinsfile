pipeline {
  agent any
  environment {
    PLATFORM_VER = "nightly"
  }
  stages {
    stage('Prepare') {
      steps {
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
        sh 'docker-compose -f docker-compose.yml -f docker-compose-first-run.yml up -d'
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
          dir("WaziCloud/tests") {
            sh 'npm run test_jenkins'
          }
        }
      }
    }
    stage('Push') {
      steps {
        sh 'docker-compose push'
      }
    }
  }
  post {
    always {
      junit 'tests/report.xml'
    }
  }
}
