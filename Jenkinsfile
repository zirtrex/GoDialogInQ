pipeline {
    agent any

	tools {nodejs "node"}
	
	environment {
		imagename = 'zirtrex/godialoginq'
		container = 'godialoginq'
		releasedVersion = getReleasedVersion()
	}
	
    stages {
        stage ('Obtener archivos del repositorio: https://github.com/zirtrex/GoDialogInQ') {
            steps {
				cleanWs()
                git 'https://github.com/zirtrex/GoDialogInQ.git'
            }
        }
		stage('Levantar servicios') {
    		steps {
      			echo "Running tests in a fully containerized environment..."
      			
				sh "chmod +x -R ${env.WORKSPACE}"

				withEnv(["PATH=$PATH:~/.local/bin"]){

        			sh "./run_apps.sh"
				}
      			
			}
    	}
		stage('Tests') {
    		steps {
      			echo "Running tests in a fully containerized environment..."
      			
				sh "chmod +x -R ${env.WORKSPACE}"				

				withEnv(["PATH=$PATH:~/.local/bin"]){

					sh "./run_test.sh"
				}
				
      			
			}
    	}
  	}

	post {
        always {
            echo 'Hola!'
        }
		success {
			mail to: "zirtrex@live.com", subject:"SUCCESS: ${currentBuild.fullDisplayName}", body: "Si, se pasaron las pruebas."
		}
		failure {
			mail to: "zirtrex@live.com", subject:"FAILURE: ${currentBuild.fullDisplayName}", body: "Ohhh, no se pasaron las pruebas."
		}
    }
}

def dockerCmd(args) {
	sh "docker ${args}"
}

def dockerComposeCmd(args) {
	sh "docker-compose ${args}"
}

def getReleasedVersion() {

	def props = readJSON file: './back/package.json'
	return props['version']

	/*return (readFile('pom.xml') =~ '<version>(.+)-SNAPSHOT</version>')[0][1]*/
}	
