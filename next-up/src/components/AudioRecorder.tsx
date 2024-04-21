import { useState, useRef } from 'react'

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState('')
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error(
        'Browser API navigator.mediaDevices.getUserMedia not available'
      )
      return
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorderRef.current = new MediaRecorder(stream)
    mediaRecorderRef.current.start()
    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data)
    }
    setIsRecording(true)
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/mp4',
        })
        const audioUrl = URL.createObjectURL(audioBlob)
        setAudioUrl(audioUrl)
      }
    }
    setIsRecording(false)
  }

  return (
    <div>
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      {audioUrl && <audio controls src={audioUrl}></audio>}
    </div>
  )
}

export default AudioRecorder
