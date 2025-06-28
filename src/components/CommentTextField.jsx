import { useRef, useEffect } from 'react';
import './AddComment.css'


function CommentTextField({
    value,
    onChange,
    onFocus,
    onBlur,
    isFocused,
    showConfirm,
    setShowConfirm,
    setComment,
    setIsFocused,
    error
}) {
    const textareaRef = useRef(null);
    
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [value]);
    
    return (
        <div className="comment-input-wrapper" tabIndex={-1} data-focused={isFocused}>
      <textarea
        ref={textareaRef}
        className="comment-textarea"
        placeholder="Join the discussion"
        value={value}
        onChange={onChange}
        rows={1}
        onFocus={onFocus}
        onBlur={onBlur}
        />
      {(isFocused || value) && (
          <div className="comment-btn-row">
          <button
            type="submit"
            className="comment-btn"
            disabled={!value.trim()}
            onMouseDown={e => e.currentTarget.classList.add('btn-pressed')}
            onMouseUp={e => e.currentTarget.classList.remove('btn-pressed')}
            onMouseLeave={e => e.currentTarget.classList.remove('btn-pressed')}
            >
            Comment
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setShowConfirm(true)}
            onMouseDown={e => e.currentTarget.classList.add('btn-pressed')}
            onMouseUp={e => e.currentTarget.classList.remove('btn-pressed')}
            onMouseLeave={e => e.currentTarget.classList.remove('btn-pressed')}
            >
            Cancel
          </button>
        </div>
      )}
      {showConfirm && (
          <div className="comment-modal-overlay">
          <div className="comment-modal">
            <p>Discard your comment?</p>
            <div className="comment-modal-btns">
              <button
                type="button"
                className="discard-btn"
                onClick={() => {
                    setComment('');
                    setIsFocused(false);
                    setShowConfirm(false);
                }}
                >
                Discard
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowConfirm(false)}
                >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default CommentTextField;

