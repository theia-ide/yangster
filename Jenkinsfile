// Tell Jenkins how to build projects from this repository
node {
	try {
		properties([
			[$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', numToKeepStr: '15']]
		])
		environment {
			NPM_AUTH_TOKEN = credentials('NPM_AUTH_TOKEN')
		}
		
		stage 'Checkout' 
		checkout scm
		
		stage 'Build the YANGSTER app' 
		sh 'yarn config set workspaces-experimental true'
		sh 'ls -la'
		sh 'yarn'
		
		stage 'Publish build results'
		sh "echo //registry.npmjs.org/:_authToken=${env.NPM_AUTH_TOKEN} > ~/.npmrc"
		sh 'yarn publish:next'

		if (currentBuild.result == 'UNSTABLE') {
			slackSend color: 'warning', message: "Build Unstable - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
//		} else {
//			slackSend color: 'good', message: "Build Succeeded - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
		}
	} catch (e) {
		slackSend color: 'danger', message: "Build Failed - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
		throw e
	}
}
