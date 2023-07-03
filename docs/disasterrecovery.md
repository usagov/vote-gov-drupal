# Vote.gov Disaster Recovery

## Table of Contents

1. [Prerequisites](#prerequisites)
    1. [Administrative](#administrative)
    1. [Application](#application)
    1. [Data](#data)
    1. [Software](#software)
        1. [Debian/Ubuntu](#debianubuntu)
        1. [MacOS](#macos)
1. [Restore Process](#restore-process)
    1. [Initialization](#initialization)
    1. [Data Extraction](#data-extraction)
    1. [Terraform Restore Process](#terraform-restore-process)
    1. [Application Restore Process](#application-restore-process)
    1. [Database Restore Process](#database-restore-process)
    1. [Media Restore Process](#media-restore-process)

## Prerequisites

### Administrative

  - Cloud.gov Spaces

    The Cloud.gov spaces should already be created. This project uses:

      - dev
      - dmz
      - prod
      - stage
      - test

    The naming convention is typically: `{project_name}-{environment_name}`.

  ### Application

  Clone of both the [application](https://github.com/usagov/vote-gov-drupal/) and [terraform](https://github.com/usagov/vote-gov-tf/) repositories.

  ### Data

  Obtain a copy of the latest backup archive available. This will likely have been moved to Google Drive or some other storage.

  ### Software

  #### Debian/Ubuntu

  - awscli
  
    [Instructions](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
  
    ```
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    unzip awscliv2.zip
    sudo ./aws/install
    ```

  - CloudFoundry CLI v8
    
    [Instructions](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html)
    
    ```
    wget -q -O - https://packages.cloudfoundry.org/debian/cli.cloudfoundry.org.key | sudo apt-key add -
    echo "deb https://packages.cloudfoundry.org/debian stable main" | sudo tee /etc/apt/sources.list.d/cloudfoundry-cli.list
    sudo apt-get update
    sudo apt-get install cf8-cli
    cf install-plugin https://github.com/cloud-gov/cf-service-connect/releases/download/1.1.0/cf-service-connect-darwin-amd64
    ```

  - jq

    ```
    sudo apt install jq
    ```

  - mysql-client

    ```
    apt-get install mysql-client
    ```

  - Terraform
    
    [Instructions](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
    
    ```
    sudo apt-get update && sudo apt-get install -y gnupg software-properties-common
    wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
    gpg --no-default-keyring --keyring /usr/share/keyrings/hashicorp-archive-keyring.gpg --fingerprint
    echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" sudo tee /etc/apt/sources.list.d/hashicorp.list
    sudo apt update
    sudo apt-get install terraform
    ```


  #### MacOS

  - Homebrew
    
    [Instructions](https://brew.sh)
    
    ```
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```
  
    NOTE: `sudo` rights are need on the laptop to install `homebrew`, otherwise permissions will be incorrect.
    
  - awscli
  
    [Instructions](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
  
    ```
    brew install awscli
    ```
    
  - CloudFoundry CLI v8
    
    [Instructions](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html)
    
    ```
    brew install cloudfoundry/tap/cf-cli@8
    cf install-plugin https://github.com/cloud-gov/cf-service-connect/releases/download/1.1.0/cf-service-connect-darwin-amd64
    ```
    
  - coreutils
    
    ```
    brew install coreutils
    ```
     
  - jq
      
    ```
    brew install jq
    ```

  - mysql-client

    ```
    brew install mysql-client
    ```

  - Terraform
    
    [Instructions](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
  
    ```
    brew tap hashicorp/tap
    brew install hashicorp/tap/terraform
    brew update
    brew upgrade hashicorp/tap/terraform
    ```

## Restore Process

  This section outlines the restoration process from a backup.

### Initialization

1. Open a terminal window.

![Terminal Window](images/disaster_recovery/restore_process_step2.png)

2. Change directory into the `terraform` repository.

![Change Directory](images/disaster_recovery/restore_process_step3.png)

3. Follow the instructions in the initialization section for the `README.md` in the `terraform` repository, running the `init.sh` script.
This step will create the pipeline accounts and various S3 buckets needed for the system to function.

### Data Extraction

1. Download the latest copy of the backup archive. You can move this file to the `terraform` repository root folder for easier access.

![Download Backup Archive](images/disaster_recovery/restore_process_step1.png)

2. Extract the data archive: `tar xf {archive_name}.tar.gz`. Three additional archives will be in the directory: `database`, `media`, and `terraform`.

![Extract Backup Archive](images/disaster_recovery/restore_process_step4.png)

### Terraform Restore Process

1. Extract the data archive: `tar xf {terraform_archive_name}.tar.gz`. This will create a new folder called `env:/`.

![Extract Backup Archive](images/disaster_recovery/tf_restore_process_step1.png)

2. To restore the Terraform state files, AWS credentials need to be created.

![Export Terraform State S3 Bucket Credentials](images/disaster_recovery/tf_restore_process_step2.png)

  - NOTES:
    - {bucket_name}: The name of the name of the `terraform` bucket in Cloud.gov.
    - {cf_space}: The space where the bucket is deployed in Cloud.gov.

 ```
  export bucket_name="{bucket_name}"
  export cf_space="{cloudgov_space_name}"
  
  source ./scripts/aws_creds.sh -t
  ```

Confirm `AWS` environmental variables have exported correctly:

```
env | sort | grep AWS
```

3. Upload the `terraform` state files to the `terraform` S3 bucket using `aws-cli`. The tool will display the progress of the file transfer.

```
aws s3 cp --recursive env:/ s3://${bucket}/env:/
```

4. Delete the `terraform` S3 credentials by running `aws_creds.sh` again.

![Delete Terraform State S3 Bucket Credentials](images/disaster_recovery/tf_restore_process_step5.png)

```
source ./scripts/aws_creds.sh -t
```

5. Trigger the pipeline for the following branches. This can be accomplished by pushing to the respective branch.
    1. `bootstrap`
    1. `dmz`
    1. `prod`

```
git checkout -b dr/restore-system
touch temp.txt
git add temp.text
git commit -m "Push to restore environment."
git push
```

2. Open a PR from `dr/restore-system` to the `prod` branch, then getting the proper merge approvals. The next items below can be skipped until `prod` is functional again.

3. Open a PR from `prod` to the `stage` branch, then getting the proper merge approvals.

4. Open a PR from `prod` to the `dev` branch, then getting the proper merge approvals.

Each environment deployment will take 5 - 10 minutes to complete, with the database instance creation taking the longest.

### Application Restore Process

1. In the terminal, change directory to the `application` repository, trigger a deployment by pushing to the branch of the environment that needs to be restored. Change a file or add a new temporary file and commit it to the repository.

```
git checkout -b dr/restore-system
touch temp.txt
git add temp.text
git commit -m "Push to restore environment."
git push
```

2. Open a PR from `dr/restore-system` to the `prod` branch, then getting the proper merge approvals. The next items below can be skipped until `prod` is functional again.

3. Open a PR from `prod` to the `stage` branch, then getting the proper merge approvals.

4. Open a PR from `prod` to the `dev` branch, then getting the proper merge approvals.
 

### Database Restore Process

1. In a terminal window, change directory to the directory that has the database backup. The filename is `backup_{timestamp}.sql.gz`.

2. Ensure that the environment has SSH enabled. The command `cf ssh {APP_NAME}` can be use to test if an SSH session can be created to the application. If it's disabled, like in `prod`, run the command below to enable it.

```
cf enable-ssh {APP_NAME}
```

3. Open a second terminal window, using it to create a secure tunnel through the application to the database service. This will display credentials required to connect to the database.

![Database Connection and Credentials](images/disaster_recovery/db_restore_process_step3.png)

```
cf connect-to-service --no-client {APP_NAME} {DATABASE_SERVICE_NAME}
```

4. Using the credentials in the second window, from the command above, import the database. Depending on the database size, this process my take some time to complete.

```
gunzip < backup_{timestamp}.sql.gz | mysql --host=127.0.0.1 --port={DATABASE_PORT} --protocol=TCP --user=${DATABASE_USERNAME} -p --database=${DATABASE_NAME}
```

Pressing enter will prompt for the database password.

5. At this point, deploying the application again would be helpful. Rerunning the last pipeline will force post-deployment steps and ensure the database doesn't have issues.

6. After confirming that the database is present, if SSH was enabled, disable it again.

```
cf disable-ssh {APP_NAME}
```

7. Use the `downsync` functionality in the pipeline to migrate the database to other environments. 

### Media Restore Process

Media files are user uploaded files, that were uploaded via the CMS. These can be a variety of files, such as PDF's, images, etc.

1. Change directory to the `terraform` repository.

  - NOTES:
    - {bucket_name}: The name of the name of the `static` bucket service in Cloud.gov.
    - {cf_space}: The space where the bucket is deployed in Cloud.gov.

 ```
  export bucket_name="{bucket_name}"
  export cf_space="{cloudgov_space_name}"
  
  source ./scripts/aws_creds.sh -s
  ```

2. Extract the media files: `tar xf media_{timestamp}.tar.gz`

Confirm `AWS` environmental variables have exported correctly:

```
env | sort | grep AWS
```

3. Upload the `media` files to the `static` S3 bucket using `aws-cli`. The tool will display the progress of the file transfer.

```
aws s3 cp --recursive cms/ s3://${bucket}/cms/
```

4. Repeat the steps above for other environments.

