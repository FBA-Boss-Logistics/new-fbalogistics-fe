import React from 'react';
import { Tooltip, Chip } from '@mui/material';
import PropTypes from 'prop-types';

const ReactionChips = ({ reactions, theme, isCurrentUserMsg }) => {
    const reactionCounts = reactions.reduce((acc, reaction) => {
        acc[reaction.reaction] = (acc[reaction.reaction] || 0) + 1;
        return acc;
    }, {});

    const userNames = (reaction) =>
        reactions
            .filter((r) => r.reaction === reaction)
            .map((r) => `${r.user.first_name} ${r.user.last_name}: ${r.reaction}`)
            .join(", ");

    return (
        <div className={`flex mt-2 flex-wrap mr-[-6px] justify-${isCurrentUserMsg ? 'end' : 'start'}`}>
            {Object.entries(reactionCounts).map(([reaction, count], index) => (
                <Tooltip title={userNames(reaction)} key={index}>
                    <Chip
                        size="small"
                        label={`${reaction} ${count > 1 ? count : ''}`}
                        sx={{
                            marginRight: "5px",
                            marginBottom: "5px",
                            backgroundColor: theme.palette.primary[200],
                            fontSize: "1rem",
                        }}
                    />
                </Tooltip>
            ))}
        </div>
    );
};

ReactionChips.propTypes = {
    reactions: PropTypes.arrayOf(
        PropTypes.shape({
            user: PropTypes.shape({
                first_name: PropTypes.string.isRequired,
                last_name: PropTypes.string.isRequired,
            }).isRequired,
            reaction: PropTypes.string.isRequired,
        })
    ).isRequired,
    theme: PropTypes.object.isRequired,
};

export default ReactionChips;
