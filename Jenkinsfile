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
		stage ('Instalar NodeJs en Back') {
			steps {
				dir ('back') {
					sh 'npm install'
				}
			}
		}
		stage ('Ejecutar Aplicacion Back') {
			steps {
				dir ('back') {
					sh 'node app &'
				}
			}
		}
		stage ('Ejecutar Mysql') {
			steps {
				dockerCmd "exec -d ${container} find /var/lib/mysql -type f -exec touch {} +"
			}
		}
		stage ('Ejecutar Pruebas de Integracion Back') {
			steps {
				dir ('back') {
					sh 'npm test'
				}
			}
		}
		/*stage ('Contruir Imagen Docker') {
			steps {				
				dockerCmd  "build -f Dockerfile -t ${imagename}:${releasedVersion} ."
			}
		}
		stage('Prueba de Integracion con Selenium'){
			steps {
				powershell 'mvn -Dtest=NewSeleneseIT  surefire:test'
			}
		}
		stage('Ejecutar docker'){
			steps {
				dockerCmd "run --name ${container} -d -t -p 8282:8080 --mount src=mysql-db-data,dst=/var/lib/mysql ${imagename}:${releasedVersion}"
			}	
		}
		stage('Ejecutar Tomcat'){
			steps {
				dockerCmd "exec -d ${container} ./bin/startup.sh"
			}
		}
    }
	
    /*post {
        always {
            echo 'Hola!'
        }
		success {
			mail to: "zirtrex@live.com", subject:"SUCCESS: ${currentBuild.fullDisplayName}", body: "Si, se pasaron las pruebas."
		}
		failure {
			mail to: "zirtrex@live.com", subject:"FAILURE: ${currentBuild.fullDisplayName}", body: "Ohhh, no se pasaron las pruebas."
		}
    }*/
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
