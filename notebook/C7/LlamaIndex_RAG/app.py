import streamlit as st
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, Settings
from llama_index.embeddings.ollama import OllamaEmbedding
from llama_index.llms.ollama import Ollama
from llama_index.core.memory import ChatMemoryBuffer
import os
import tempfile
import shutil
import time

# OLLAMA_NUM_PARALLEL：同时处理单个模型的多个请求
# OLLAMA_MAX_LOADED_MODELS：同时加载多个模型

os.environ['OLLAMA_NUM_PARALLEL'] = '2'
os.environ['OLLAMA_MAX_LOADED_MODELS'] = '2'


# Function to handle multiple file uploads
def handle_file_upload(uploaded_files):
    if uploaded_files:
        temp_dir = tempfile.mkdtemp()
        for uploaded_file in uploaded_files:
            file_path = os.path.join(temp_dir, uploaded_file.name)
            with open(file_path, "wb") as f:
                f.write(uploaded_file.getvalue())
        return temp_dir
    return None


# Function to reload data from uploaded files
def reload_data(directory):
    return SimpleDirectoryReader(directory).load_data()


# Function to prepare generation configuration
def prepare_generation_config():
    with st.sidebar:
        st.sidebar.header("Parameters")
        max_length = st.slider('Max Length', min_value=8, max_value=5080, value=4056)
        temperature = st.slider('Temperature', 0.0, 1.0, 0.7, step=0.01)
        st.button('Clear Chat History', on_click=clear_chat_history)

    generation_config = {
        'num_ctx': max_length,
        'temperature': temperature
    }
    return generation_config


# Function to clear chat history
def clear_chat_history():
    st.session_state.messages = []


def get_model(_document):
    with st.spinner('Loading embedding model...'):
        Settings.embed_model = OllamaEmbedding(model_name="nomic-embed-text")
        time.sleep(1)

    with st.spinner('Loading language model...'):
        generation_config = prepare_generation_config()
        Settings.llm = Ollama(model="llama3.1", request_timeout=360.0,
                              num_ctx=generation_config['num_ctx'],
                              temperature=generation_config['temperature'])
        time.sleep(1)

    with st.spinner('Building index...'):
        index = VectorStoreIndex.from_documents(_document)
        time.sleep(1)

    st.empty()  # Clear the info and success messages

    return index


# Streamlit application
def main():
    st.title("💻 Local RAG Chatbot 🦙")
    st.caption("🚀 A RAG chatbot powered by LlamaIndex.")

    # File upload in the sidebar
    st.sidebar.header("Upload Data")
    uploaded_files = st.sidebar.file_uploader("Upload your data files:", type=["txt", "pdf", "docx"],
                                              accept_multiple_files=True)

    if uploaded_files:
        temp_dir = handle_file_upload(uploaded_files)
        if temp_dir:
            documents = reload_data(temp_dir)
            st.sidebar.success("Files uploaded and data loaded.")
            index = get_model(documents)
            shutil.rmtree(temp_dir)  # Clean up temporary directory

            # Initialize chat history
            if 'messages' not in st.session_state:
                st.session_state.messages = []

            # Display chat messages from history
            for message in st.session_state.messages:
                with st.chat_message(message['role'], avatar=message.get('avatar')):
                    st.markdown(message['content'])

            # Display chat input field at the bottom
            if prompt := st.chat_input("Ask a question about Datawhale:"):

                with st.spinner('Setting up chat engine...'):
                    memory = ChatMemoryBuffer.from_defaults(token_limit=4000)
                    chat_engine = index.as_chat_engine(
                        chat_mode="context",
                        memory=memory,
                        system_prompt="You are a chatbot, able to have normal interactions.",
                    )
                    time.sleep(1)

                with st.chat_message('user'):
                    st.markdown(prompt)

                # Generate response
                # response = chat_engine.chat(prompt)
                response = chat_engine.stream_chat(prompt)
                with st.chat_message('assistant'):
                    message_placeholder = st.empty()
                    res = ''
                    for token in response.response_gen:
                        res += token
                        message_placeholder.markdown(res + '▌')
                    message_placeholder.markdown(res)

                # Add messages to history
                st.session_state.messages.append({
                    'role': 'user',
                    'content': prompt,
                })
                st.session_state.messages.append({
                    'role': 'assistant',
                    'content': response,
                })


if __name__ == "__main__":
    main()
