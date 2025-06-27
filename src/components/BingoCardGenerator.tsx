import React, { useState } from 'react';
import { Grid, Printer, Shuffle, Plus, AlertCircle } from 'lucide-react';import './BingoCardGenerator.css';


interface BingoCard {
  id: number;
  grid: string[][];
}

const BingoCardGenerator: React.FC = () => {
  const [inputWords, setInputWords] = useState('');
  const [numberOfCards, setNumberOfCards] = useState(1);
  const [bingoCards, setBingoCards] = useState<BingoCard[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const generateBingoCard = (words: string[], cardId: number): BingoCard => {
    const shuffledWords = shuffleArray(words);
    const grid: string[][] = [];
    
    let wordIndex = 0;
    
    for (let row = 0; row < 5; row++) {
      grid[row] = [];
      for (let col = 0; col < 5; col++) {
        grid[row][col] = shuffledWords[wordIndex % shuffledWords.length];
        wordIndex++;
      }
    }
    
    return { id: cardId, grid };
  };

  const generateCards = () => {
    const words = inputWords
      .split('\n')
      .map(word => word.trim())
      .filter(word => word.length > 0);

    if (words.length < 25) {
      alert('Please enter at least 25 words to generate a complete bingo card.');
      return;
    }

    setIsGenerating(true);
    
    // Simulate generation delay for better UX
    setTimeout(() => {
      const newCards: BingoCard[] = [];
      for (let i = 0; i < numberOfCards; i++) {
        newCards.push(generateBingoCard(words, i + 1));
      }
      setBingoCards(newCards);
      setIsGenerating(false);
    }, 500);
  };

  const handlePrint = () => {
    window.print();
  };

  const wordCount = inputWords.split('\n').filter(word => word.trim().length > 0).length;
const [cardTitle, setCardTitle] = useState("BINGO")
  return (
    <>
      <div className="max-w-7xl mx-auto p-6 print:hidden">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Grid className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Bingo Card Generator</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create beautiful, unique bingo cards for your events. Enter your words, specify the number of cards, and generate professional-quality bingo cards ready for printing.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid lg:grid-cols-2 gap-8">  
            
         <div>    
                 <label htmlFor="cardTitle" >Card title</label><br/>
                <input type="text" id="cardTitle" onChange={(e) => setCardTitle(e.target.value)} defaultValue={cardTitle}/>
                </div>
            {/* Words Input */}
            <div>
            
              <label htmlFor="words" className="block text-lg font-semibold text-gray-900 mb-3">
                Bingo Words
              </label>
              <div className="relative">
                <textarea
                  id="words"
                  value={inputWords}
                  onChange={(e) => setInputWords(e.target.value)}
                  placeholder="Enter one word or phrase per line...&#10;Example:&#10;Apple&#10;Banana&#10;Cherry&#10;Date&#10;Elderberry"
                  className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                />
                <div className="absolute bottom-3 right-3 text-sm text-gray-500">
                  {wordCount} words
                </div>
              </div>
              {wordCount > 0 && wordCount < 25 && (
                <div className="flex items-center gap-2 mt-2 text-amber-600">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">Need at least 25 words for a complete bingo card</span>
                </div>
              )}
            </div>

            {/* Settings */}
            <div>
              <label htmlFor="cardCount" className="block text-lg font-semibold text-gray-900 mb-3">
                Number of Cards
              </label>
              <input
                id="cardCount"
                type="number"
                min="1"
                max="50"
                value={numberOfCards}
                onChange={(e) => setNumberOfCards(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              
              <div className="mt-6 space-y-4">
                <button
                  onClick={generateCards}
                  disabled={wordCount < 25 || isGenerating}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Shuffle className="w-5 h-5" />
                      Generate Bingo Cards
                    </>
                  )}
                </button>

                {bingoCards.length > 0 && (
                  <button
                    onClick={handlePrint}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Printer className="w-5 h-5" />
                    Print Cards
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Generated Cards Preview */}
        {bingoCards.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Generated Cards ({bingoCards.length})
              </h2>
              <div className="text-sm text-gray-500">
                Ready for printing in A4 format
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {bingoCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      BINGO
                    </h3>
                    <div className="text-sm text-gray-500">
                      Card #{card.id}
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-1">
                    {card.grid.map((row, rowIndex) =>
                      row.map((cell, colIndex) => (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className="aspect-square border border-gray-400 flex items-center justify-center text-center p-1 bg-white text-xs font-medium leading-tight"
                        >
                          {cell}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Print-only Cards */}
      {bingoCards.length > 0 && (
        <div style={{ display: 'none' }} className="print-container">
          {bingoCards.map((card, index) => (
            <div
              key={`print-${card.id}`}
              className="print-card"
              style={{
                pageBreakAfter: index < bingoCards.length - 1 ? 'always' : 'auto'
              }}
            >
              <div className="print-header">
                <h1 className="print-title">{cardTitle}</h1>
                <div className="print-card-number">Card #{card.id}</div>
              </div>

              <div className="print-grid">
                {card.grid.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <div
                      key={`print-${rowIndex}-${colIndex}`}
                      className="print-cell"
                    >
                      <span className="print-cell-text">
                        {cell}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </>
  );
};

export default BingoCardGenerator;