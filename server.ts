import { homedir } from 'os'
import path from 'path'
import {Logs as _Logs} from 'xeue-logs'
import {Shell as _Shell} from 'xeue-shell'

const __data = path.join(homedir(), 'grow')

const Logs = new _Logs(true, 'grow', __data, 'D', false)
const Shell = new _Shell(Logs, 'GROW', 'D')

const publicIP = '10.102.49.11'
const mediaPath = '/mnt/wsl/01_MEDIA/03_LIVE'

Logs.log(`Starting streams`)

doStream('MatchA', 1, 8026)
doStream('MatchB', 1, 8263)
doStream('MatchC', 1, 8369)

Logs.log(`Started streams`)


function doStream(match: string, counter: number, port: number) {
    Logs.log(`Starting ${match}`)
    
    const matchProcess = Shell.process(`sudo ffmpeg -mode listener -i srt://${publicIP}:${port} -c:v v210 -vf setfield=tff -r 25 -s 1920x1080 -ac 2 -ar 48000 -y -vcodec libx264 -g 1 -pix_fmt yuv422p10le -r 50000/1000 -x264-params avcintra-class=100:interlaced=0 ${mediaPath}/${match}/${match}_${counter}.mxf`, false)
    matchProcess.on('exit', ()=>{
        Logs.warn(`${match} has exited`)
        doStream(match, counter++, port)
    })
}
