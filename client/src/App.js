import React, { useEffect, useState } from 'react'
import './App.css'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import axios from 'axios'
function App() {
	const [result, setResult] = useState('')
	const {
		transcript,
		finalTranscript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition,
	} = useSpeechRecognition()
	const startListening = () =>
		SpeechRecognition.startListening({
			continuous: true,
			language: 'he',
			interimResults: true,
			maxAlternatives: 1,
			onResult: result => console.log(result),
		})

	useEffect(() => {
		const checkFt = txt =>
			finalTranscript === txt || finalTranscript.startsWith(txt) || txt.startsWith(finalTranscript)
		const isOff =
			finalTranscript &&
			(checkFt('ויהי חושך') ||
				checkFt('חושך') ||
				checkFt('כבה') ||
				checkFt('כיבוי') ||
				checkFt('לכבות'))
		if (isOff) {
			axios
				.get('http://localhost:4000/api?mode=off')
				.then(res => {
					console.log(res.data)
					setResult('מכבה')
          resetTranscript()
				})
				.catch(err => console.log(err))
		}
		const isOn =
			finalTranscript &&
			(checkFt('ויהי אור') ||
				checkFt('הדלק') ||
				checkFt('הדלקה') ||
				checkFt('הפעלה') ||
				checkFt('להדליק'))
		if (isOn) {
			axios
				.get('http://localhost:4000/api?mode=on')
				.then(res => {
					console.log(res.data)
					setResult('מדליק')
          resetTranscript()
				})
				.catch(err => console.log(err))
		}
    const brightness = finalTranscript && (
      checkFt('אור') || 
      checkFt('בהירות') || 
      checkFt('מהירות') || 
      checkFt('בהיר') || 
      checkFt('תאורה')
      )
    if (brightness) {
      let perc =  finalTranscript.replace(/[\D]/g, '')
      if (!perc || perc > 100 || perc < 0) return
      axios
        .get(`http://localhost:4000/api?bright=${perc}`)
        .then(res => {
          console.log(res.data)
          setResult(`בהירות: ${perc}%`)
          resetTranscript()
        })
        .catch(err => console.log(err))
    }
	}, [finalTranscript])


useEffect(() => {
  let id;
    if (finalTranscript){
      id = setTimeout(() => {
        resetTranscript()
      }, 1000);
    }
    return () => clearTimeout(id);
  }, [finalTranscript]);

	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn't support speech recognition.</span>
	}

	return (
		<div className='App'>
			<header className='App-header'>
				<button
					onTouchStart={startListening}
					onMouseDown={startListening}
					onTouchEnd={SpeechRecognition.stopListening}
					onMouseUp={SpeechRecognition.stopListening}
					onClick={startListening}>
					החזק ודבר
				</button>
				<p>{result}</p>
			</header>
		</div>
	)
}

export default App
