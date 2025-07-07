import React from 'react';
import BookmarkCard from './BookmarkCard';

function Bookmarks({ bookmarks, onDelete }) {
    return (
        <div className="w-full">
            {bookmarks.length === 0 ? (
                <p className="text-gray-600 text-center mb-4">
                    No bookmarks yet. Add one above.
                </p>
            ) : (
                <div className="flex m-5 flex-wrap">
                    {bookmarks.map(bookmark => (
                        <div key={bookmark._id} className="m-2">
                            <BookmarkCard bookmark={bookmark} onDelete={onDelete} />
                        </div>
                    ))}
                </div>

            )}
        </div>
    );
}

export default Bookmarks;