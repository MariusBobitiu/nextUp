import { useState } from 'react'
import AudioRecorder from './AudioRecorder'

const AiForm = () => {
  const [text, setText] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted:', text)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative mx-auto max-w-4xl">
        <textarea
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="block w-full rounded-2xl border border-navy-700 bg-navy-600 p-4 pb-16 pl-10 text-sm text-white placeholder-gray-400 outline-none focus:border-accent-teal-500"
          required
          rows={7}
        />
        <div className="absolute bottom-2.5 right-2.5 flex items-center justify-center gap-4 p-1">
          <AudioRecorder />
          <button
            type="submit"
            className="rounded-xl bg-accent-teal px-4 py-2 text-sm font-medium text-white hover:bg-accent-teal-700 focus:outline-none focus:ring-4 focus:ring-accent-teal-800"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}

export default AiForm
