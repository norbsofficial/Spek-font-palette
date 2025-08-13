import React from 'react';
import Logo from './Logo';

const Header: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Logo size="md" />

                    <nav className="hidden md:flex items-center gap-6">
                        <a
                            href="https://github.com/norbsofficial/Spek-font-palette"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://github.com/norbsofficial/Spek-font-palette/issues"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Issues
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
