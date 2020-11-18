pipeline {
    agent any

	tools {nodejs "nodejs"}
	
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
