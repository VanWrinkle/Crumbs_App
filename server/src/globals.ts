import path from "path";
import fs, {PathOrFileDescriptor} from "fs";
import YAML from "yaml";

export const reactDir = path.join(__dirname, '..', '..', 'client', 'build');
export const loggingDirectory = path.join(__dirname, 'logs');
export const DBloggingOutput: PathOrFileDescriptor = loggingDirectory + '/db-error.log'
export const httpsPrivateKey = fs.readFileSync('./keys/private-key.pem', 'utf-8')
export const httpsCertificate = fs.readFileSync('./keys/server.crt', 'utf-8')

export const config = YAML.parse(
    fs.readFileSync('./config/config.yaml', 'utf-8'))
export const testConfig = YAML.parse(
    fs.readFileSync('./config/test_config.yaml', 'utf-8'))

