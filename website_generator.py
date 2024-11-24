import os
import markdown
from datetime import datetime

class WebsiteGenerator:
    def __init__(self, output_dir):
        self.output_dir = output_dir
        self.ensure_directory_exists()

    def ensure_directory_exists(self):
        """Create output directory if it doesn't exist"""
        if not os.path.exists(self.output_dir):
            os.makedirs(self.output_dir)

    def generate_project_html(self, projects):
        """Generate HTML for project cards"""
        project_html = '<div class="project-grid">'
        for project in projects:
            project_html += f'''
                <div class="project-card">
                    <h3>{project['title']}</h3>
                    <p>{project['description']}</p>
                    <a href="{project['link']}">Learn More</a>
                </div>
            '''
        project_html += '</div>'
        return project_html

    def update_content(self, content):
        """Update the website content"""
        try:
            with open(os.path.join(self.output_dir, 'index.html'), 'r', encoding='utf-8') as file:
                html = file.read()

            # Update the content sections
            for section, content_data in content.items():
                if section.endswith('.md'):
                    # Handle markdown content
                    html_content = markdown.markdown(content_data)
                    section_name = section[:-3]  # Remove .md extension
                    placeholder = f"<!-- {section_name} content -->"
                elif section == 'projects':
                    # Handle projects list
                    html_content = self.generate_project_html(content_data)
                    placeholder = f"<!-- {section} content -->"
                else:
                    # Handle plain HTML content
                    html_content = str(content_data)
                    placeholder = f"<!-- {section} content -->"

                html = html.replace(placeholder, html_content)

            with open(os.path.join(self.output_dir, 'index.html'), 'w', encoding='utf-8') as file:
                file.write(html)
            print("Website content updated successfully!")

        except FileNotFoundError:
            print(f"Error: index.html not found in {self.output_dir} directory")
        except Exception as e:
            print(f"Error updating content: {str(e)}")

# Example usage
if __name__ == "__main__":
    generator = WebsiteGenerator("docs")
    
    # Example content updates
    content = {
        "about.md": """
# About Me
I'm a software developer with a passion for creating elegant solutions to complex problems.
I specialize in Python, JavaScript, and cloud technologies.
        """,
        "projects": [
            {
                "title": "Project Alpha",
                "description": "A machine learning project for predicting user behavior",
                "link": "https://github.com/yourusername/project-alpha"
            },
            {
                "title": "Project Beta",
                "description": "An automated testing framework for web applications",
                "link": "https://github.com/yourusername/project-beta"
            }
        ]
    }
    
    generator.update_content(content)