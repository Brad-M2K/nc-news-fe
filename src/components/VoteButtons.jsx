import { useState } from 'react';
import { patchVotes } from '../utils/patchVotes'
import HollowUpArrow from '../assets/Hollow-Cut-Up-Arrow.svg?react';
import HollowDownArrow from '../assets/Hollow-Cut-Down-Arrow.svg?react';



function VoteButtons({ type, id, voteCount, setVoteCount }) {

    const [error, setError] = useState(null)
    const [userVote, setUserVote] = useState(0);

    const handleVote = async (inc) => {
        let newVote;
        if (userVote === inc) {
            // Clicking the same button again removes the vote
            newVote = 0;
        } else {
            newVote = inc;
        }
        const diff = newVote - userVote;
        setVoteCount((prev) => prev + diff);
        setUserVote(newVote);
        setError(null);
        try {
            await patchVotes(type, id, diff);
        } catch (err) {
            setVoteCount((prev) => prev - diff);
            setUserVote(userVote);
            setError("Failed to vote.", err);
        }
    };
    

    return (
        <div className="vote-buttons-inline">
            <button onClick={() => handleVote(1)} aria-pressed={userVote === 1}>
                <HollowUpArrow style={{ width: 22, height: 22, verticalAlign: 'middle' }} />
            </button>
            <span>{voteCount}</span>
            <button onClick={() => handleVote(-1)} aria-pressed={userVote === -1}>
                <HollowDownArrow style={{ width: 22, height: 22, verticalAlign: 'middle' }} />
            </button>
            {error && <p>{error}</p>}
        </div>
    );
}

export default VoteButtons;